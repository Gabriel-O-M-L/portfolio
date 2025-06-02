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

const Application = forwardRef<ApplicationHandle, ApplicationProps>(({
    initialPos = { x: window.innerWidth / 2, y: window.innerHeight / 4 },
    initialSize = { width: 300, height: 300 },
    children,
    ...props
    }, ref) => {
    const [pos, setPos] = useState(initialPos);
    const [size, setSize] = useState(initialSize);
    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);
    const [rel, setRel] = useState<{ x: number; y: number } | null>(null);
    const domRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        resize: (width, height) => {
            setSize({ width, height });
        },
        moveTo: (x, y) => {
            setPos({ x, y });
        }
    }));

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
                const boundedY = Math.max(0, Math.min(newY, viewportHeight - elementHeight) - 48);

                setPos({ x: boundedX, y: boundedY });

                e.stopPropagation();
                e.preventDefault();
            } else if (resizing && domRef.current) {
                const newWidth = e.pageX - domRef.current.getBoundingClientRect().left;
                const newHeight = e.pageY - domRef.current.getBoundingClientRect().top;

                setSize({
                    width: Math.max(100, newWidth),
                    height: Math.max(100, newHeight),
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
    }, [dragging, resizing, rel]);

    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0 || !domRef.current) return;
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
            style={{
                position: 'absolute',
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                background: '#f9f9f9',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                ...props.style,
            }}
            {...props}
        >
            {children}
            <div
                onMouseDown={onResizeMouseDown}
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
