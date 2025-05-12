'use client'
import Image from "next/image"

interface CellImageProps {
    imageUrl: string
}

const CellImage = ({ imageUrl }: CellImageProps) => {
    return (
        <div className="overflow-hidden rounded-md w-16 h-16 min-w-16 min-h-16 relative shadow-md">
            <Image src={imageUrl} alt={""} fill />
        </div>
    );
}

export default CellImage;