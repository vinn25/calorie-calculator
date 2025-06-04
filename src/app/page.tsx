import DefaultLayout from '@/components/layout/DefaultLayout';
import LayoutHome from '@/components/ui/home/LayoutHome';
import { ReduxProvider } from '@/redux/provider';
import Image from 'next/image';

export default function Home() {
    return (
        <DefaultLayout title="NutriTrack">
            <LayoutHome />
        </DefaultLayout>
    );
}
