import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface ModalBoxPropsTypes {
    btnText: string | number;
    modalHeader: string;
    widthSize: string;
    icon?: any;
    children: React.ReactNode;
}


const ModalBox = ({ btnText, modalHeader, widthSize, icon, children }: ModalBoxPropsTypes) => {
    return (
        <Dialog>
            <DialogTrigger className={`border-2 px-4 py-1 rounded-full ${widthSize} hover:bg-gray-100 transition-all flex justify-center items-center gap-2`}>{icon}{btnText}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='mb-3'>{modalHeader}</DialogTitle>
                    <DialogDescription>
                        {children}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ModalBox