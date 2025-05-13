import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';

import { postAuthLoginGoogle } from '@/redux/actions/auth';

const GoogleLoginOauth = () => {
    const dispatch = useDispatch();
    const responseGoogle = async (response: any) => {
        await dispatch<any>(
            postAuthLoginGoogle({
                data: {
                    token: response.credential,
                },
                token: response.credential,
            })
        );
    };
    return (
        <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_API_GOOGLE_CLIENT_ID || ''}
            key={process.env.NEXT_PUBLIC_API_GOOGLE_SECRET}
        >
            <GoogleLogin
                onSuccess={responseGoogle}
                text="signin_with"
                size="large"
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginOauth;
