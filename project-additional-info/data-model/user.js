var user = {
  id: ObjectId,
  userName: String,
  password: String,
  fullname: String,
  lFullName: String, //(lowercase),
  email: String,
  phone: Number,
  active: Boolean,
  is_superuser: Boolean,
  is_admin: Boolean,
  is_staff: Boolean,
  created_at: Date,
  update_at: Date,
  birthdate: Date
};

var address= [
  {
    userId:ObjectId,
    country: String,
    city: String,
    state: String,
    road: String,
    house: String,
    floor: String
  }
],
