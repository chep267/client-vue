/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage.ts';

export const vi = {
    // title
    [AuthLanguage.component.title.signin]: 'Đăng nhập',
    [AuthLanguage.component.title.register]: 'Đăng kí',
    [AuthLanguage.component.title.recover]: 'Quên mật khẩu',
    [AuthLanguage.component.title.verifyOTP]: 'Mã xác thực',
    [AuthLanguage.component.title.signout]: 'Đăng xuất',

    // label
    [AuthLanguage.component.label.email]: 'Email',
    [AuthLanguage.component.label.password]: 'Mật khẩu',
    [AuthLanguage.component.label.confirmPassword]: 'Xác nhận mật khẩu',

    // status
    [AuthLanguage.status.email.empty]: 'Email trống!',
    [AuthLanguage.status.password.empty]: 'Mật khẩu trống!',
    [AuthLanguage.status.email.invalid]: 'Email không hợp lệ!',
    [AuthLanguage.status.password.invalid]:
        'Tối thiểu 8 kí tự, bao gồm ít nhất 1 chữ thường, 1 chữ hoa, 1 số, 1 kí tự đặc biệt!',

    // button
    [AuthLanguage.component.button.signin]: 'Đăng nhập',
    [AuthLanguage.component.button.register]: 'Đăng kí',
    [AuthLanguage.component.button.recover]: 'Xác thực',
    [AuthLanguage.component.button.clear]: 'Làm mới',

    // notify
    [AuthLanguage.notify.refresh.error]: 'Phiên đăng nhập đã hết hạn!',
    [AuthLanguage.notify.signin.error]: 'Tài khoản hoặc mật khẩu không chính xác!',
    [AuthLanguage.notify.register.success]: 'Tài khoản đăng kí thành công!',
    [AuthLanguage.notify.register.error]: 'Tài khoản đã tồn tại!',
    [AuthLanguage.notify.recover.success]: 'Tài khoản xác thực thành công!',
    [AuthLanguage.notify.recover.error]: 'Tài khoản không tồn tại!',
    [AuthLanguage.notify.server.error]: 'Máy chủ không phản hồi, vui lòng thử lại sau.',
} as const;
