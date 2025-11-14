import { customAlphabet } from 'nanoid';
import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
@Injectable()
export class VerificationCodeService {
  generate6DigitCode = ({ length = 6 }: { length: number }) => {
    const nanoidNumeric = customAlphabet('0123456789', length);
    return nanoidNumeric();
  };
  generate6DigitCodeWithExpiredAt = ({
    ttl = 5,
    length = 6,
  }: {
    ttl?: number;
    length: number;
  }) => {
    const code = this.generate6DigitCode({ length });
    const expiredAt = dayjs().add(ttl, 'minute').toDate();
    return { code, expiredAt };
  };
  isCodeExpired = (expiredAt: Date): boolean => {
    return dayjs().isAfter(expiredAt);
  };
}
