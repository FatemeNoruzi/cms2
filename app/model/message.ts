
export class Message {
    SessionID = '';
    AssemblyName= '';
    TypeName  = '';
    MethodName = '';
    Parameters = '';
    Info  = '';
    Data  =  '' ;
}

export class Info {
    InfoCode = '';
    Title = '';
    Description = '';
    Type = '';
    InfoParameters = new Array<InfoParameter>() ;
}

export class InfoParameter {
  InfoTitle = '' ;
  InfoValue = '' ;
}


