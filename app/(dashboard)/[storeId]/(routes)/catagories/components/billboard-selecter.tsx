import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectScrollableProps {
    value: string;
    onChange: (value: string) => void;
    data: {
        billboardName: string,
        billboardId: string
    }[]
}

export function SelectScrollable({ value, data, onChange }: SelectScrollableProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select a billboard" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data.map((billboard) => (
                        <SelectItem key={billboard.billboardId} value={billboard.billboardId}>
                            {billboard.billboardName}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
