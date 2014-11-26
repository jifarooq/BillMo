# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141126064957) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friendships", force: true do |t|
    t.integer "user_id",   null: false
    t.integer "friend_id", null: false
  end

  add_index "friendships", ["user_id", "friend_id"], name: "index_friendships_on_user_id_and_friend_id", unique: true, using: :btree

  create_table "transactions", force: true do |t|
    t.float    "amount",      null: false
    t.string   "note"
    t.integer  "payer_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "receiver_id", null: false
  end

  create_table "users", force: true do |t|
    t.string   "username",                         null: false
    t.string   "password_digest",                  null: false
    t.string   "token",                            null: false
    t.string   "gravatar_url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "balance",         default: 1000.0
  end

end
