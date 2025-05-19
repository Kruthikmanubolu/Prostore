"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import ProductPrice from "./product-price";

import { Product } from "@/types";
import { Loader } from "lucide-react"; // optional spinner icon

const ProductCard = ({ product }: { product: Product }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        setLoading(true);
        router.push(`/product/${product.slug}`);
    };

    const price = Number(product.price);
    const rating = Number(product.rating);

    return (
        <div className="relative" onClick={handleClick}>
            {loading && (
                <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-md">
                    <Loader className="animate-spin h-6 w-6 text-gray-700" />
                </div>
            )}
            <Card className="w-full max-w-sm cursor-pointer">
                <CardHeader className="p-0 items-center">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        height={300}
                        width={345}
                        priority
                        suppressHydrationWarning
                    />
                </CardHeader>
                <CardContent className="p-4 grid gap-4">
                    <div className="text-xs">{product.Brand}</div>
                    <h2 className="text-sm font-medium">{product.name}</h2>
                    <div className="flex justify-between items-center gap-4">
                        <p>{rating} Stars</p>
                        {product.stock > 0 ? (
                            <ProductPrice value={price} />
                        ) : (
                            <p className="text-destructive">Out Of Stock</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductCard;
