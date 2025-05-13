import { Icon } from '@iconify/react';

interface Props {
    type: 'error' | 'success' | 'info' | 'warning';
    text: string;
}

const Alert = ({ type, text }: Props) => {
    return (
        <div
            className={`flex rounded-md border-2 p-2 ${type === 'error' ? 'border-red bg-[#FEF4F4]' : type === 'success' && 'border-[#04BB00] bg-[#F6FFED]'}`}
        >
            <div className="mr-3">
                {type === 'error' ? (
                    <Icon
                        icon="fluent:dismiss-circle-16-filled"
                        width="16"
                        height="16"
                        color="red"
                    />
                ) : (
                    type === 'success' && (
                        <Icon
                            icon="fluent:checkmark-circle-16-filled"
                            width="16"
                            height="16"
                            color="#04BB00"
                        />
                    )
                )}
            </div>
            <div className="text-text-md">{text}</div>
        </div>
    );
};

export default Alert;
