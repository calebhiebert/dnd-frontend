import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ng-socket-io';

@Injectable()
export class SocketService {

  elevated = false;

  constructor(private toast: ToastrService, private socket: Socket) {

    socket.on('connect', () => {
      toast.success('Socket connection established', null, {
        positionClass: 'toast-bottom-right'
      });

      if (localStorage.getItem('auth-token') !== null) {
        this.elevateConnection(localStorage.getItem('auth-token'))
          .then(userId => {
            toast.success('Successfully elevated _socket connection', null, {positionClass: 'toast-bottom-right'});
          })
          .catch(err => {
            toast.error(err, null, {positionClass: 'toast-bottom-right'});
          });
      }
    });

    socket.on('nn', () => {
      console.log('GOT NOTIFICATIONS');
    });
  }

  supplyToken(token: string) {
    if (token.trim() === '') {
      console.log('DeElevating connection');
      this.socket.emit('de-elevate-me');
    } else {
      this.elevateConnection(token).then(userId => {
        this.toast.success('Successfully elevated _socket connection', null, {positionClass: 'toast-bottom-right'});
      })
        .catch(err => {
          this.toast.error(err, null, {positionClass: 'toast-bottom-right'});
        });
    }
  }

  elevateConnection(token) {
    return new Promise(((resolve, reject) => {
      if (this.elevated === true) {
        return resolve(true);
      }

      console.log('Elevating connection');
      this.socket.emit('elevate-me', token);
      this.socket.on(`elevate-me-response-${token}`, elevationResponse => {
        if (elevationResponse.error) {
          reject(elevationResponse.error);
        } else {
          resolve(elevationResponse.userId);
        }
      });
    }));
  }
}
