import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.shipping.perishable{
   export enum ProductType {
      BANANAS,
      APPLES,
      PEARS,
      PEACHES,
      COFFEE,
   }
   export enum ShipmentStatus {
      CREATED,
      IN_TRANSIT,
      ARRIVED,
   }
   export abstract class ProductionLotTransaction extends Transaction {
      productionLot: ProductionLot;
   }
   export abstract class BatchTransaction extends Transaction {
      batch: Batch;
   }
   export class setup extends Transaction {
   }
   export class CreateContract extends Transaction {
      contractId: string;
      grower: Grower;
      shipper: Shipper;
      importer: Importer;
      arrivalDateTime: Date;
      unitPrice: number;
      minTemperature: number;
      maxTemperature: number;
      minPenaltyFactor: number;
      maxPenaltyFactor: number;
   }
   export class CreateProductionLot extends Transaction {
      grower: Grower;
      productionLotId: string;
      productType: ProductType;
      quantity: number;
      contract: Contract;
   }
   export class TemperatureReading extends ProductionLotTransaction {
      centigrade: number;
   }
   export class CertificateGranted extends ProductionLotTransaction {
   }
   export class ClearanceGranted extends ProductionLotTransaction {
   }
   export class ShipmentIssued extends ProductionLotTransaction {
   }
   export class ShipmentReceived extends ProductionLotTransaction {
      importer: Importer;
   }
   export class PurchaseLot extends ProductionLotTransaction {
   }
   export class PurchaseBatch extends BatchTransaction {
      supermarket: Supermarket;
   }
   export class CreateBatch extends ProductionLotTransaction {
      batchId: string;
      quantity: number;
   }
   export class PurchaseProducts extends BatchTransaction {
      productId: string;
      quantity: number;
      consumer: Consumer;
   }
   export class ProductionLot extends Asset {
      grower: Grower;
      importer: Importer;
      productionLotId: string;
      productType: ProductType;
      expirationDate: Date;
      shipmentStatus: ShipmentStatus;
      quantity: number;
      certificateGranted: CertificateGranted[];
      clearanceGranted: ClearanceGranted[];
      temperatureReadings: TemperatureReading[];
      contract: Contract;
   }
   export class Contract extends Asset {
      contractId: string;
      grower: Grower;
      shipper: Shipper;
      importer: Importer;
      arrivalDateTime: Date;
      unitPrice: number;
      minTemperature: number;
      maxTemperature: number;
      minPenaltyFactor: number;
      maxPenaltyFactor: number;
   }
   export class Batch extends Asset {
      batchId: string;
      productionLot: ProductionLot;
      quantity: number;
      soldQuantity: number;
      supermarket: Supermarket;
   }
   export class Products extends Asset {
      productId: string;
      batch: Batch;
      consumer: Consumer;
      quantity: number;
   }
   export class Address {
      city: string;
      country: string;
      street: string;
      zip: string;
   }
   export abstract class Business extends Participant {
      name: string;
      address: Address;
      accountBalance: number;
   }
   export class Grower extends Business {
   }
   export class QualityInspector extends Business {
   }
   export class Customs extends Business {
   }
   export class Consumer extends Business {
   }
   export class Shipper extends Business {
   }
   export class Importer extends Business {
   }
   export class Supermarket extends Business {
   }
// }
