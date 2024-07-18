import { Knex } from "knex";

const TABLE_NAME = "role_permissions";

/**
 * Seed entries for table rolePermissions.
 *
 * @param   {Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).insert([
    {
      role_id: 1,
      permission_id: 5,
    },
    {
      role_id: 1,
      permission_id: 6,
    },
    {
      role_id: 1,
      permission_id: 7,
    },
    {
      role_id: 1,
      permission_id: 8,
    },

    {
      role_id: 2,
      permission_id: 1,
    },

    {
      role_id: 2,
      permission_id: 2,
    },

    {
      role_id: 2,
      permission_id: 3,
    },
    {
      role_id: 2,
      permission_id: 4,
    },
    {
      role_id: 2,
      permission_id: 5,
    },
    {
      role_id: 2,
      permission_id: 6,
    },
    {
      role_id: 2,
      permission_id: 7,
    },
    {
      role_id: 2,
      permission_id: 8,
    },
  ]);
}
