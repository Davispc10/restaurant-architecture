import { text, pgTable, integer } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { products } from './products';
import { relations } from 'drizzle-orm';
import { orders } from './orders';

export const ordersItems = pgTable('orders_items', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  orderId: text('order_id')
    .references(() => orders.id, {
      onDelete: 'cascade'
    })
    .notNull(),
  productId: text('product_id')
    .references(() => products.id, {
      onDelete: 'set null'
    })
    .notNull(),
  priceInCents: integer('price_in_cents').notNull(),
  quantity: integer('quantity').notNull()
});

export const ordersItemsRelations = relations(ordersItems, ({ one, many }) => {
  return {
    order: one(orders, {
      fields: [ordersItems.orderId],
      references: [orders.id],
      relationName: 'order_item_order'
    }),
    product: one(products, {
      fields: [ordersItems.productId],
      references: [products.id],
      relationName: 'order_item_product'
    })
  };
});
