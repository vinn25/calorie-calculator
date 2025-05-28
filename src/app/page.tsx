import DefaultLayout from '@/components/layout/DefaultLayout';
import LayoutHome from '@/components/ui/home/LayoutHome';
import Image from 'next/image';

export default function Home() {
    return (
        <DefaultLayout>
            <LayoutHome />
        </DefaultLayout>
    );
}
