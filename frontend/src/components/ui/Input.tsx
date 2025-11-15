interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input = ({ label, ...props }: Props) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-700">{label}</label>
        <input
            {...props}
            className="border border-gray-300 rounded px-3 py-2 focus:border-blue-600 focus:ring focus:outline-none"
        />
    </div>
);