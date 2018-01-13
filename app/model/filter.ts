export class FilterColl {
  InnerCondition = '';
  OuterCondition= '' ;
  Filters: Filter[] = [];
}

export class Filter {
   FieldName = '' ;
   FilterValue = '' ;
   FilterType = '';
   RefTable = '';
}
