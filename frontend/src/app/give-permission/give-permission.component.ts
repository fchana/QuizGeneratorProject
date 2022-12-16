import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Proposition } from 'app/shared/Model/proposition';
import { User } from 'app/shared/Model/user';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-give-permission',
  templateUrl: './give-permission.component.html',
  styleUrls: ['./give-permission.component.scss']
})
export class GivePermissionComponent implements OnInit {

  selectedProp: any;

  sourceProducts: User[];

  avaliableStudent: User[];

  targetProducts: User[];

  profileJson?: User;
  proposition!: Proposition[];
  items: MenuItem[];

  home: MenuItem;

  constructor(private http: HttpClient, public auth: AuthService) { }

  ngOnInit() {
    this.sourceProducts = [];
    this.targetProducts = [];
    // this.productService.getProductsSmall().then(products => this.availableProducts = products);
    this.CallProfile();
    this.items = [

    ];
    this.home = {icon: 'pi pi-home', routerLink: '/props', label: ' Home'};
  }

  onChangeDropDown() {
      this.avaliableStudent = this.sourceProducts;
      this.targetProducts = this.sourceProducts;
      this.targetProducts = this.targetProducts.filter((check) => {
        return this.selectedProp.allowed.includes(check.id);
      })
      // console.log(this.targetProducts)
      this.avaliableStudent = this.avaliableStudent.filter((check) => {
        return !this.selectedProp.allowed.includes(check.id)
      })
    // else
    //   this.avaliableStudent = this.selectedProp;
    
  }

  CallProfile() {
    this.auth.idTokenClaims$.subscribe(
      (profile) => (
        this.http.get<any>('/api/user/getAllStd').subscribe((response) => {
          this.sourceProducts = response;
        })
      )
    );
    this.auth.idTokenClaims$.subscribe(
      (test) => (this.http.get<User>('/api/user/' + test?.email).subscribe((response) => {
        this.profileJson = response;
        this.proposition = this.profileJson.proposition;
        console.log(this.profileJson.proposition[0].allowed)
      }))
    )
  }

  Update() {
    let allowed: any = this.targetProducts.map((map) => {
      return map.id;
    });
    allowed.map
    for (let i = 0; i < this.proposition.length; i++) {
      if (this.selectedProp.prop_name === this.proposition[i].prop_name) {
        if (this.profileJson != undefined) {
          if (this.profileJson.proposition[i] != undefined) {
            if (this.profileJson.proposition[i].allowed != undefined) {
              console.log(this.targetProducts)
              this.profileJson.proposition[i].allowed = allowed;
            }
          }
        }
      }
    }

    this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
      console.log(response);
    })

    // this.profileJson?.proposition[this.pid].quiz.splice(this.id,  1, userUpdate);
  }

  // Update1(){
  //   let allowed: any = this.targetProducts.map((map) => {
  //     return map.id;
  //   });
  //   allowed.map
  //   for (let i = 0; i < this.proposition.length; i++) {
  //     if (this.selectedProp.prop_name === this.proposition[i].prop_name) {
  //       if (this.profileJson != undefined) {
  //         if(this.profileJson.proposition[i] != undefined){
  //           if(this.profileJson.proposition[i].allowed != undefined){
  //             console.log(this.targetProducts)
  //             this.profileJson.proposition[i].allowed = allowed;
  //           }
  //         }
  //       }
  //     }
  //   }

  //   this.http.put('/api/user/' + this.profileJson?.id, this.profileJson).subscribe((response) => {
  //     console.log(response);
  //   })
  // }

}
