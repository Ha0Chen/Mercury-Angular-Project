export interface Chapter {
  name:string;
  url:string | null;
  sections: Chapter[];
}
