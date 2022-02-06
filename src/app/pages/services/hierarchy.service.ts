import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class HierarchyService {
  private BASE_DOMAIN = environment.MEMBERS_API_BASE_DOMAIN;

  constructor(private http: HttpClient) {}

  getMemberHierarchyById(id: string) {
    return this.http.get(`${this.BASE_DOMAIN}/hierarchy/${id}`, {
      responseType: "text",
    });
  }
}
