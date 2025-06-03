import Image from "next/image";
import {useEffect, useRef} from "react";
import Application, {ApplicationHandle} from "@/components/Application/Application";
import Link from "next/link";

interface Props {
    toggleSpectrogram: () => void;
}

export default function SpectrogramInfo({ toggleSpectrogram }: Props) {
    const appRef = useRef<ApplicationHandle>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        appRef.current?.resize(515, 946);
        scrollRef.current?.scrollTo({ top: 0 });
    }, []);

    return (
        <Application ref={appRef} initialPos={{ x: 50, y: 0 }}>
            <div className="bg-quaternary w-full h-full border-4 flex flex-col ">
                <div className="bg-primary flex w-full">
                    <h1 className="text-white left-2 relative text-2xl">3D Spectrogram</h1>
                    <div className="flex justify-center items-center ml-auto pr-0.5">
                        <div className="flex bg-quinary w-[20px] h-[20px] justify-center items-center m-1" onClick={toggleSpectrogram}>
                            <Image src="/icons/options/Close.png" width={16} height={16} alt="close" />
                        </div>
                    </div>
                </div>
                <div
                    ref={scrollRef}
                    className="prose lg:prose-xl max-w-none mx-auto px-4 py-8 flex-col overflow-y-scroll max-h-fit pt-0 mt-0"
                >
                <Link className="text-blue-500" href="https://github.com/FacoBackup/3D-Spectrogram">
                    https://github.com/FacoBackup/3D-Spectrogram
                </Link>
                <h1>3D Spectrogram Renderer</h1>
                <p>
                    A C++ project that visualizes the frequency and magnitude of an audio signal over time using a 3D spectrogram. It leverages the <strong>Short-Term Fourier Transform (STFT)</strong> to extract time-varying frequency components from an audio file and renders them in a spatial 3D plot.
                </p>

                <hr />

                <h2>🎥 Demo</h2>
                <Image
                    src="/samples/sample.gif"
                    alt="3D Spectrogram Demo"
                    width={800}
                    height={450}
                />
                <hr />
                <h2>🖼 Screenshots</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Spectrogram Overview</th>
                        <th>Magnitude Detail</th>
                        <th>Frequency Profile</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <Image
                                src="/samples/Screenshot 2025-05-04 at 14.46.33.png"
                                alt="Spectrogram Overview"
                                width={250}
                                height={150}
                            />
                        </td>
                        <td>
                            <Image
                                src="/samples/Screenshot 2025-05-04 at 14.48.56.png"
                                alt="Magnitude Detail"
                                width={250}
                                height={150}
                            />
                        </td>
                        <td>
                            <Image
                                src="/samples/Screenshot 2025-05-04 at 14.50.23.png"
                                alt="Frequency Profile"
                                width={250}
                                height={150}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table>
                    <thead>
                    <tr>
                        <th>Interactive Camera</th>
                        <th>Surface Detail</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <Image
                                src="/samples/Screenshot 2025-05-04 at 15.49.50.png"
                                alt="Interactive Camera"
                                width={250}
                                height={150}
                            />
                        </td>
                        <td>
                            <Image
                                src="/samples/Screenshot 2025-05-04 at 15.49.59.png"
                                alt="Surface Detail"
                                width={250}
                                height={150}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>

                <hr />

                <h2>🧠 Features</h2>
                <ul>
                    <li>Performs Short-Term Fourier Transform (STFT) on audio input</li>
                    <li>Extracts time-frequency-magnitude data</li>
                    <li>Renders 3D volume based on spectrogram values using a Sparse Voxel Octree</li>
                    <li>Interactive camera for orbiting and zooming</li>
                    <li>Customizable resolution and FFT parameters</li>
                    <li>Custom renderer using Vulkan</li>
                </ul>
            </div>
            </div>
        </Application>
    );
}
