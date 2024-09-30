import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export function formatJapaneseDate(date: Date): string {
    return format(date, 'M 月 d 日', { locale: ja });
}


const exampleDate = new Date(2024, 9, 23);

