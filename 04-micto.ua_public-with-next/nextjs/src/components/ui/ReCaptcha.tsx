'use client';
import { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { reCaptchaCheck } from '@/app/actions';
import { useFormContext } from 'react-hook-form';

interface IReCaptchaProps {
	className?: string;
}
export const ReCaptcha = ({ className }: IReCaptchaProps) => {
	const {
		setValue,
		formState: { errors },
		clearErrors,
	} = useFormContext();
	const reCaptchaRef = useRef<ReCAPTCHA>(null);
	const handleCaptchaSubmission = async (token: string | null) => {
		if (!token) return;
		try {
			const isValid = await reCaptchaCheck(token);
			if (isValid) {
				setValue('recaptcha', true);
				if (errors.recaptcha) {
					clearErrors('recaptcha');
				}
			}
		} catch (error) {
			setValue('recaptcha', false);
		}
	};
	useEffect(() => {
		if (errors.root) {
			reCaptchaRef.current?.reset();
			setValue('recaptcha', false);
		}
	}, [errors.root, setValue]);
	const handleReCapthcaChange = (token: string | null) => {
		handleCaptchaSubmission(token);
	};

	return (
		<div className={className}>
			<ReCAPTCHA
				ref={reCaptchaRef}
				sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
				onChange={handleReCapthcaChange}
				onExpired={() => setValue('recaptcha', false)}
			/>
			{errors.recaptcha && (
				<p className="text-[var(--red)] fontInterRegular14 mt-2">Капчу введено невірно</p>
			)}
		</div>
	);
};
