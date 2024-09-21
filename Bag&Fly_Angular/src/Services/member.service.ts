import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/Modeles/Administrator';
import { GLOBAL } from 'src/app/app-config';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private httpClient: HttpClient) {}
  tab: User[] = GLOBAL._DB.members;
  ONSAVE(MemberToSave: any): Observable<any> {
    //return this.httpClient.post('localhost:8080/api/members',MemberToSave)
    //generer la requete http en mode post vers back end
    //return this.httpClient.post
    //('127.0.01.8080/api/Member',memberToSave)

    const member1 = {
      ...MemberToSave,
      id: Math.ceil(Math.random() * 1000).toString(),
      createdDate: new Date().toString(),
    };
    this.tab.push(member1);
    return new Observable((observer) => observer.next());
  }
  ONDELETE(id: string): Observable<any> {
    //return this.httpClient.delete('127.0.0.1:8080/api/Member/id')

    this.tab = this.tab.filter((item) => item.id != id); //effacer le ligne
    console.log(this.tab);
    return new Observable((observer) => observer.next()); //ki bech ifasakh myrajaa chy juste el memeber tfasakh ou ykad yestanna tafsi5aat o5riin
  }

  getMemberById(idcourant: string): Observable<User> {
    //return this.httpClient.get<any>('127.0.0.1:8080/api/Member/$idcourant')

    return new Observable((observer) =>
      observer.next(
        this.tab.filter((item) => item.id == idcourant)[0] ?? null //bech ilwej el mmemeber selon id ou yebthou le subsriber pour l'editer( subscriber(x))
      )
    );
  }
  updateMember(id: string, memberupdate: any): Observable<any> {
    const index = this.tab.findIndex((item) => item.id == id);
    this.tab[index] = { ...this.tab[index], ...memberupdate };
    return new Observable((observer) => observer.next());
  }
}
