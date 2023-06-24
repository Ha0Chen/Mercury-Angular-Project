export interface Chapter {
  name:string;
  url:string | undefined;
  sections: Chapter[];
}
