export enum ServerError {
  None , NotLogIn , ErrorConnection
}

export enum Gender {
 Man ,  Woman
}

export enum FilterType {
   Contains, NotContains, StartWith,
   EndtWith, EqualWith, EqualWithNumeric,
   NotEqualWith, GreaterThan, LessThan, GreaterThanOrEqual,
   LessThanOrEqual,  Between, Null, NotNull
}

export enum ConditionType {
  AND, OR
}

export enum TypeIndexValues {
   Item, NewsTitle, NewsBody, Brand, ItemGroup
}
