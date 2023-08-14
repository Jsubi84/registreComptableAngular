import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  isLoading: boolean = false;
  isFirstLoad: boolean = true;

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setIsFirstLoad(value: boolean) {
    this.isFirstLoad = value;
  }
}

