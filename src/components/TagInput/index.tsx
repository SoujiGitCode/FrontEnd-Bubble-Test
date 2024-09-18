import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';

type Framework = { value: string; label: string };

const FRAMEWORKS: Framework[] = [
    { value: 'next.js', label: 'Next.js' },
    { value: 'react.js', label: 'React.js' },
    { value: 'vue.js', label: 'Vue.js' },
    { value: 'svelte.js', label: 'Svelte.js' },
    { value: 'angular.js', label: 'Angular.js' },
    { value: 'express.js', label: 'Express.js' },
    { value: 'nest.js', label: 'Nest.js' },
];

const TagInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [content, setContent] = useState<(string | Framework)[]>([]);
    const [open, setOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const insertTagAtCursor = (tag: Framework) => {
        const cursorPosition = inputRef.current?.selectionStart ?? 0;
        const beforeCursor = inputValue.slice(0, cursorPosition);
        const afterCursor = inputValue.slice(cursorPosition);
        const newContent = [...content, beforeCursor, tag, afterCursor].filter(Boolean);
        setContent(newContent);

        setInputValue('');
        setOpen(false);
    };

    const handleTagDelete = (index: number) => {
        const newContent = content.filter((_, i) => i !== index);
        setContent(newContent);
    };

    const renderContent = () => {
        return content.map((item, index) => {
            if (typeof item === 'string') {
                return <span key={index}>{item}</span>;
            } else {
                return (
                    <span
                        key={index}
                        className="bg-[#DAD8D8] text-[#303030] rounded-full px-3 py-2 text-sm flex items-center space-x-2"
                    >
                        {item.label}
                        <button
                            className="bg-[#303030] text-white rounded-full w-4 h-4 flex items-center justify-center focus:outline-none ml-2"
                            onClick={() => handleTagDelete(index)}
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                );
            }
        });
    };

    return (
        <div>
            <div className="border border-gray-300 rounded-md p-2 flex items-center flex-wrap gap-2">
                {renderContent()}

                {/* Normal Input */}
                <input
                    ref={inputRef}
                    className="outline-none flex-grow min-w-[50px]"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setOpen(true)}
                    placeholder="Type or select a tag..."
                />
            </div>

            {/* Tags Select */}
            {open && (
                <div className="relative mt-2 border rounded-md bg-white shadow-md">
                    <ul>
                        {FRAMEWORKS.filter((tag) => !content.includes(tag)).map((tag) => (
                            <li
                                key={tag.value}
                                className="cursor-pointer p-2 hover:bg-gray-100"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    insertTagAtCursor(tag); // Insert tag selected in current position
                                }}
                            >
                                {tag.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TagInput;
