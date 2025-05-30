import Image from "next/image";
import {useState} from "react";
import Mail from "@/components/Application/Mail";

export default function IconMail() {
    const [mail, setMail] = useState(false)

    const toggleMail = () => {
        setMail(!mail)
    }

  return (
      <>
      <button onClick={toggleMail} className="w-fit">
        <Image src={"/icons/Mail.png"} width={172} height={172} alt={"Mail"}/>
      </button>
          {mail && <Mail toggleMail={toggleMail}/>}
      </>
  );
}