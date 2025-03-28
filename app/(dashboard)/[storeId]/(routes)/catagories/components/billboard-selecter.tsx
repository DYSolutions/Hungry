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
    data: string[];
}

export function SelectScrollable({ value, data, onChange }: SelectScrollableProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a billboard" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data.map((billboard, index) => (
                        <SelectItem key={index} value={billboard}>
                            {billboard}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
