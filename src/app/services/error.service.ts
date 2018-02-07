import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorService {

  constructor(private toastr: ToastrService) { }

  error(error: any) {
    this.toastr.error(error, 'Error', {
      positionClass: 'toast-bottom-right'
    });
  }

}
