// Интерфейс для единицы результата поиска
export interface IsearchItem {
  id: number;
  full_name: string;
  description: string;
}

// Интерфейс для репозитория, отображаемого на странице репозитория
export interface Irepo {
  title: string;
  tags: Array<string>;
  langs: Array<string>;
  description: string;
  ownerName: string;
  ownerImg: string;
}
