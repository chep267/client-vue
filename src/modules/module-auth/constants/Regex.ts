/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

const RegexEmail = /^\S+@\S+\.\S+$/i;

const RegexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i;

const RegexPhone = /^\+?[1-9][0-9]{7,14}$/i;

export const Regex = {
    email: RegexEmail,
    password: RegexPassword,
    phone: RegexPhone,
};
