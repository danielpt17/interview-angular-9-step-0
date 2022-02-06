import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class MembersService {
  private BASE_DOMAIN = environment.MEMBERS_API_BASE_DOMAIN;

  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get(`${this.BASE_DOMAIN}/members`);
  }

  getMemberById(id: string) {
    return this.http.get(`${this.BASE_DOMAIN}/members/${id}`);
  }
}
