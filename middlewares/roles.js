const Roles = {  
    ADMIN: 'admin',  
    STAFF: 'staff',  
    CUSTOMER: 'customer',  
};  

Object.freeze(Roles); // Prevents modification of the roles  

module.exports = Roles;