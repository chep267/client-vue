/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** type */
import type { VTextField } from 'vuetify/components/VTextField';

type TypeItem = {
    id: string | number;
} & unknown;

export interface TableBaseProps<T extends TypeItem> {
    data?: T[];
    loading?: boolean;
    emptyText?: string;

    rows?: {
        id: string;
        label: ReactNode;
        isSort?: boolean;
        render(item: T, indexRow: number, indexCell: number): ReactNode;
    }[];
    orderType?: OrderType;
    orderBy?: string;
    onRequestSort?: (property: string) => void;

    onScroll?(event: UIEvent<HTMLDivElement>): void;
    onClickItem?(payload: { item: T; indexRow: number; indexCell: number }): void;
}
export type TableLoadingProps = Pick<TableBaseProps, 'loading' | 'emptyText'> & { empty?: boolean };
export type TableHeaderProps = Pick<TableBaseProps, 'rows' | 'orderBy' | 'orderType' | 'onRequestSort'>;
export type TableBodyProps = Pick<TableBaseProps, 'data' | 'rows'>;

export type TypeInputElem = HTMLInputElement | null;

export type InputBaseProps = {
    type?: VTextField['type'];
    label?: VTextField['label'];
    modelValue?: VTextField['modelValue'];
    disabled?: VTextField['disabled'];
    placeholder?: VTextField['placeholder'];
    error?: VTextField['error'];
    errorMessages?: VTextField['errorMessages'];
    autocapitalize?: VTextField['autocapitalize'];
    autocomplete?: VTextField['autocomplete'];
    appendInnerIcon?: VTextField['appendInnerIcon'];
    'onClick:appendInner'?: VTextField['onClick:appendInner'];
    [key: string]: any;
};
