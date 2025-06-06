import {
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
    ReactNode,
    CSSProperties,
    MouseEvent
} from 'react';

let globalZIndex = 10;
const getNextZIndex = () => ++globalZIndex;

export interface ApplicationHandle {
    resize: (width: number, height: number) => void;
    moveTo?: (x: number, y: number) => void;
}

interface ApplicationProps {
    initialPos?: { x: number; y: number };
    initialSize?: { width: number; height: number };
    children: ReactNode;
    style?: CSSProperties;
    [key: string]: any;
}

const TASKBAR_HEIGHT = 48;

const Application = forwardRef<ApplicationHandle, ApplicationProps>(({
                                                                         initialPos = { x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 4 : 0 },
                                                                         initialSize = { width: 300, height: 300 },
                                                                         children,
                                                                         ...props
                                                                     }, ref) => {
    const [pos, setPos] = useState(initialPos);
    const [size, setSize] = useState(initialSize);
    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);
    const [rel, setRel] = useState<{ x: number; y: number } | null>(null);
    const [zIndex, setZIndex] = useState(getNextZIndex());
    const domRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        resize: (width, height) => {
            setSize({ width, height });
        },
        moveTo: (x, y) => {
            setPos({ x, y });
        }
    }));

    useEffect(() => {
        setVisible(true);
    }, []);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (dragging && rel) {
                const newX = e.pageX - rel.x;
                const newY = e.pageY - rel.y;

                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                const elementWidth = domRef.current?.offsetWidth || 0;
                const elementHeight = domRef.current?.offsetHeight || 0;

                const boundedX = Math.max(0, Math.min(newX, viewportWidth - elementWidth));
                const boundedY = Math.max(0, Math.min(newY, viewportHeight - elementHeight - TASKBAR_HEIGHT));

                setPos({ x: boundedX, y: boundedY });

                e.stopPropagation();
                e.preventDefault();
            } else if (resizing && domRef.current) {
                const rect = domRef.current.getBoundingClientRect();
                const newWidth = e.pageX - rect.left;
                const newHeightRaw = e.pageY - rect.top;

                const windowHeight = window.innerHeight;
                const top = pos.y;
                const maxHeight = windowHeight - TASKBAR_HEIGHT - top;
                const newHeight = Math.max(100, Math.min(newHeightRaw, maxHeight));

                setSize({
                    width: Math.max(100, newWidth),
                    height: newHeight,
                });

                e.stopPropagation();
                e.preventDefault();
            }
        };

        const onMouseUp = (e: MouseEvent) => {
            setDragging(false);
            setResizing(false);
            e.stopPropagation();
            e.preventDefault();
        };

        if (dragging || resizing) {
            document.addEventListener('mousemove', onMouseMove as any);
            document.addEventListener('mouseup', onMouseUp as any);
        }

        return () => {
            document.removeEventListener('mousemove', onMouseMove as any);
            document.removeEventListener('mouseup', onMouseUp as any);
        };
        // Array de dependências fixo e literal:
    }, [dragging, resizing, !!rel, pos.y]);

    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0 || !domRef.current) return;

        const target = e.target as HTMLElement;
        if (target.dataset && target.dataset.resize) return;

        setZIndex(getNextZIndex());
        const pos = domRef.current.getBoundingClientRect();
        setDragging(true);
        setRel({
            x: e.pageX - pos.left,
            y: e.pageY - pos.top,
        });
        e.stopPropagation();
        e.preventDefault();
    };

    const onResizeMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;
        setResizing(true);
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <div
            ref={domRef}
            onMouseDown={onMouseDown}
            className={`transition-opacity duration-600 ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{
                position: 'absolute',
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                minHeight: '180px',
                minWidth: '110px',
                background: '#f9f9f9',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                zIndex,
                ...props.style,
            }}
            {...props}
        >
            {children}
            <div
                onMouseDown={onResizeMouseDown}
                data-resize="true"
                style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '10px',
                    height: '10px',
                    cursor: 'se-resize',
                    backgroundColor: '#ccc',
                }}
            />
        </div>
    );
});

export default Application;