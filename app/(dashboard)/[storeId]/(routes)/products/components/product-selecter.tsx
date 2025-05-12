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
        name: string,
        id: string
    }[];
    name?: string;
}

export function SelectScrollable({ value, data, onChange,name }: SelectScrollableProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[300px]">
                <SelectValue placeholder={`Select a ${name}`} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data.map((options) => (
                        <SelectItem key={options.id} value={options.name}>
                            {options.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
