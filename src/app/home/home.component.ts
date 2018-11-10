import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ResultModel, ShowField, SimulatorFields} from './home.component.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FormsModule]
})
export class HomeComponent implements OnInit {

  TipoCalculo: string = "";

  ResultadoSimple: ResultModel = new ResultModel();
  ResultadoCompuesto: ResultModel = new ResultModel();

  CamposSimulador:SimulatorFields = new SimulatorFields();
  showField:ShowField={
    Monto:false,
    Tasa:false,
    Periodo:false,
    ValorFuturo:false,
    ValorPresente:false,
    Results:false,
  };
  

  change(){
    this.showField.Monto=false;
    this.showField.Tasa=false;
    this.showField.Periodo=false;
    this.showField.ValorFuturo=false;
    this.showField.ValorPresente=false;
    this.showField.Results=false;

    this.CamposSimulador = new SimulatorFields();
    switch (this.TipoCalculo) {
      case "ValorFuturo":
        this.showField.Monto = true;
        this.showField.Tasa = true;
        this.showField.Periodo = true;
        break;
        case "ValorPresente":
        this.showField.ValorFuturo = true;
        this.showField.Tasa = true;
        this.showField.Periodo = true;
        break;
        case "ValorInteres":
        this.showField.ValorFuturo = true;
        this.showField.ValorPresente = true;
        this.showField.Periodo = true;
        break;
        case "ValorPeriodo":
        this.showField.ValorFuturo = true;
        this.showField.ValorPresente = true;
        this.showField.Tasa = true;
        break;
       /* case "TasaInteres":
        this.showField.interes = true;
        this.showField.Monto = true;
        break;*/

    }
  }
  Calcular()
  {
    console.log(this.CamposSimulador);
    this.ResultadoSimple=new ResultModel();
    this.ResultadoCompuesto=new ResultModel();
    switch (this.TipoCalculo) {
      case "ValorFuturo":
      this.ResultadoSimple.value = this.ValorFuturoSimple(this.CamposSimulador.Monto,this.CamposSimulador.Tasa,this.CamposSimulador.Periodo);
      this.ResultadoCompuesto.value = this.ValorFuturoCompuesto(this.CamposSimulador.Monto,this.CamposSimulador.Tasa,this.CamposSimulador.Periodo);
        break;
        case "ValorPresente":
        this.ResultadoSimple.value = this.ValorPresenteSimple(this.CamposSimulador.ValorFuturo,this.CamposSimulador.Tasa,this.CamposSimulador.Periodo);
        this.ResultadoCompuesto.value = this.ValorPresenteSimple(this.CamposSimulador.ValorFuturo,this.CamposSimulador.Tasa,this.CamposSimulador.Periodo);
        break;
        case "ValorInteres":
        this.ResultadoSimple.value = this.ValorInteresSimple(this.CamposSimulador.ValorFuturo,this.CamposSimulador.ValorPresente,this.CamposSimulador.Periodo);
        this.ResultadoCompuesto.value = this.ValorInteresCompuesto(this.CamposSimulador.ValorFuturo,this.CamposSimulador.ValorPresente,this.CamposSimulador.Periodo);
        break;
        case "ValorPeriodo":
        this.ResultadoSimple.value = this.ValorPeriodoSimple(this.CamposSimulador.ValorFuturo,this.CamposSimulador.ValorPresente,this.CamposSimulador.Tasa);
        this.ResultadoCompuesto.value = this.ValorPeriodoCompuesto(this.CamposSimulador.ValorFuturo,this.CamposSimulador.ValorPresente,this.CamposSimulador.Tasa);        
        break;
    }

    this.PrepararResultados();   
    this.showField.Results=true; 
  }
  PrepararResultados(){
    this.ResultadoCompuesto.class="fa-circle bg-primary";
    this.ResultadoSimple.class="fa-circle bg-primary";
    this.ResultadoCompuesto.textColor="text-primary";
    this.ResultadoSimple.textColor="text-primary";
    

    if(this.ResultadoCompuesto.value > this.ResultadoSimple.value){
     
      this.ResultadoCompuesto.class="fa-close bg-danger";
      this.ResultadoSimple.class="fa-check bg-success";
      this.ResultadoCompuesto.textColor="text-danger";
      this.ResultadoSimple.textColor="text-success";

    }else if(this.ResultadoCompuesto.value < this.ResultadoSimple.value){    

      this.ResultadoCompuesto.class="fa-check bg-success";
      this.ResultadoSimple.class="fa-close bg-danger";
      this.ResultadoCompuesto.textColor="text-success";
      this.ResultadoSimple.textColor="text-danger";
    } 
    this.ResultadoCompuesto.valueStr = this.ResultadoCompuesto.value.toString();   
    this.ResultadoSimple.valueStr = this.ResultadoSimple.value.toString();   
  }
  ValorInteres(MontoPagado:number,MontoPrestado:number):number{
    return MontoPagado-MontoPrestado;
  }

  TasaInteres(Interes:number,MontoPrestado:number):number{
    return (Interes/MontoPrestado)*100;
  }

  /*interes simple */
  ValorFuturoSimple(Monto:number,interes:number,periodo:number):number{
    return Monto*(  1+periodo* interes );
  }
  ValorPresenteSimple(ValorFuruto:number,interes:number,periodo:number):number{
    return ValorFuruto/( 1+periodo*interes );
  }
  ValorInteresSimple(ValorFuturo:number,ValorPresente:number,Periodo:number):number
  {    
    return ((ValorFuturo/ValorPresente)-1) * (1/Periodo);
  }
  ValorPeriodoSimple(ValorFuturo:number,ValorPresente:number,Interes:number):number{
    return ((ValorFuturo/ValorPresente)-1) * (1/Interes);
  }

  /*interes Simple */
  ValorFuturoCompuesto(Monto:number,interes:number,periodo:number):number{
    return Monto*( Math.pow( (1+interes), periodo)  );
  }
  ValorPresenteCompuesto(ValorFuruto:number,interes:number,periodo:number):number{
    return ValorFuruto/( Math.pow((1+interes),periodo)  );
  }
  ValorInteresCompuesto(ValorFuturo:number,ValorPresente:number,Periodo:number):number
  {    
    return Math.pow((ValorFuturo/ValorPresente),(1/Periodo))-1;
  }
  ValorPeriodoCompuesto(ValorFuturo:number,ValorPresente:number,Interes:number):number{
    return (Math.log( ValorFuturo/ValorPresente  ))/( Math.log(1+Interes) );
  }


  constructor() { }

  ngOnInit() {
  }

}
