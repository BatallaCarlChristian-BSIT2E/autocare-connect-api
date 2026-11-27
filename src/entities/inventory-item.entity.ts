import { Check, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('inventory_items')
@Check('CHK_inventory_quantity_nonnegative', '`quantity_in_stock` >= 0')
@Check('CHK_inventory_price_nonnegative', '`unit_price` >= 0')
export class InventoryItem {
  @PrimaryGeneratedColumn() id: number;
  @Column({ name: 'item_name', length: 100 }) itemName: string;
  @Column({ length: 50, unique: true }) sku: string;
  @Column({ name: 'quantity_in_stock', type: 'int', default: 0 }) quantityInStock: number;
  @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2, default: 0 }) unitPrice: string;
  @Column({ name: 'reorder_level', type: 'int', default: 0 }) reorderLevel: number;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
