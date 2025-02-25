import { useState, useEffect, useRef, ReactNode, CSSProperties, MouseEvent } from 'react';

interface ApplicationProps {
    initialPos?: { x: number; y: number };
    initialSize?: { width: number; height: number };
    children: ReactNode;
    style?: CSSProperties;
    [key: string]: any;
}

const Application = ({ initialPos = { x: screen.width/2, y: screen.height/4 }, initialSize = { width: 300, height: 300 }, children, ...props }: ApplicationProps) => {
    const [pos, setPos] = useState<{ x: number; y: number }>(initialPos);
    const [size, setSize] = useState<{ width: number; height: number }>(initialSize);
    const [dragging, setDragging] = useState<boolean>(false);
    const [resizing, setResizing] = useState<boolean>(false);
    const [rel, setRel] = useState<{ x: number; y: number } | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (dragging && rel) {
                const newX = e.pageX - rel.x;
                const newY = e.pageY - rel.y;

                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                const elementWidth = ref.current?.offsetWidth || 0;
                const elementHeight = ref.current?.offsetHeight || 0;

                const boundedX = Math.max(0, Math.min(newX, viewportWidth - elementWidth));
                const boundedY = Math.max(0, Math.min(newY, viewportHeight - elementHeight));

                setPos({ x: boundedX, y: boundedY });

                e.stopPropagation();
                e.preventDefault();
            } else if (resizing) {
                const newWidth = e.pageX - pos.x;
                const newHeight = e.pageY - pos.y;

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
            document.addEventListener('mousemove', onMouseMove as unknown as EventListener);
            document.addEventListener('mouseup', onMouseUp as unknown as EventListener);
        } else {
            document.removeEventListener('mousemove', onMouseMove as unknown as EventListener);
            document.removeEventListener('mouseup', onMouseUp as unknown as EventListener);
        }

        return () => {
            document.removeEventListener('mousemove', onMouseMove as unknown as EventListener);
            document.removeEventListener('mouseup', onMouseUp as unknown as EventListener);
        };
    }, [dragging, resizing, rel, pos]);

    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;
        if (!ref.current) return;
        const pos = ref.current.getBoundingClientRect();
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
            ref={ref}
            onMouseDown={onMouseDown}
            style={{
                position: 'absolute',
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
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
                    backgroundColor: 'transparent',
                }}
            />
        </div>
    );
};

export default Application;