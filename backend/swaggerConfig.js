// swaggerConfig.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API documentation for your Node.js and MongoDB backend",
            contact: {
                name: "API Support",
                email: "support@example.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Local server"
            }
        ],
        components: {
            schemas: {
              Booking: {
                  type: "object",
                  required: [
                      "id_guest",
                      "id_room_array",
                      "arrival_date",
                      "departure_date",
                      "guests_qty"
                  ],
                  properties: {
                      id_guest: {
                          type: "string",
                          description: "ID del huésped (referencia a Guest)",
                           example: "66ff4b87db91ff9e0265a6f4"
                      },
                      id_booking: {
                          type: "integer",
                          description: "ID de la reserva"
                      },
                      id_room_array: {
                          type: "array",
                          items: {
                              type: "string",
                              description: "ID de la habitación (referencia a Room)"
                          },
                          description: "Array con los IDs de las habitaciones reservadas",
                          example: [
                              "66fb61daa1fafb57a4a3bb1c",
                              "66fb61daa1fafb57a4a3bb19"
                          ]
                      },
                      booking_date: {
                          type: "string",
                          format: "date-time",
                          description: "Fecha de creación de la reserva"
                          
                      },
                      arrival_date: {
                          type: "string",
                          format: "date",
                          description: "Fecha de llegada",
                          example: "2024-07-17"
                      },
                      departure_date: {
                          type: "string",
                          format: "date",
                          description: "Fecha de salida",
                          example: "2024-07-20"
                      },
                      nights_qty: {
                          type: "integer",
                          description: "Cantidad de noches reservadas"
                      },
                      guests_qty: {
                          type: "integer",
                          description: "Cantidad de huéspedes",
                          example: 4
                      },
                      is_modified: {
                          type: "boolean",
                          description: "Si la reserva ha sido modificada"
                      },
                      is_paid: {
                          type: "boolean",
                          description: "Si la reserva ha sido pagada"
                      },
                      is_cancelled: {
                          type: "boolean",
                          description: "Si la reserva ha sido cancelada"
                      },
                      last_update_datetime: {
                          type: "string",
                          format: "date-time",
                          description: "Fecha y hora de la última actualización"
                      }
                  }
              },
                Room: {
                    type: "object",
                    required: [
                        "id_room",
                        "hotel_name",
                        "floor_number",
                        "room_number",
                        "capacity",
                        "orientation",
                        "room_class",
                        "amenities"
                    ],
                    properties: {
                        id_room: {
                        type: "integer",
                        description: "ID de la habitación"
                        },
                        hotel_name: {
                        type: "string",
                        description: "Nombre del hotel"
                        },
                        floor_number: {
                        type: "integer",
                        description: "Número del piso"
                        },
                        room_number: {
                        type: "integer",
                        description: "Número de la habitación"
                        },
                        capacity: {
                        type: "integer",
                        description: "Capacidad de la habitación"
                        },
                        orientation: {
                        type: "string",
                        description: "Orientación de la habitación"
                        },
                        room_class: {
                        type: "string",
                        description: "Clase de la habitación"
                        },
                        amenities: {
                        type: "string",
                        description: "Comodidades de la habitación"
                        }
                    }
                    },
                    "Guest": {
                      "type": "object",
                      "required": [
                        "id_guest",
                        "guest_name",
                        "guest_lastname",
                        "gender",
                        "birth_date",
                        "register_date",
                        "guest_rank",
                        "user"
                      ],
                      "properties": {
                        "id_guest": {
                          "type": "integer",
                          "description": "ID del huésped"
                        },
                        "guest_name": {
                          "type": "string",
                          "description": "Nombre del huésped"
                        },
                        "guest_lastname": {
                          "type": "string",
                          "description": "Apellido del huésped"
                        },
                        "gender": {
                          "type": "string",
                          "description": "Género del huésped"
                        },
                        "birth_date": {
                          "type": "string",
                          "format": "date",
                          "description": "Fecha de nacimiento"
                        },
                        "contact_number": {
                          "type": "string",
                          "description": "Número de contacto (opcional)"
                        },
                        "DNI_number": {
                          "type": "string",
                          "description": "Número de DNI (opcional)"
                        },
                        "guest_adress": {
                          "type": "string",
                          "description": "Dirección del huésped (opcional)"
                        },
                        "register_date": {
                          "type": "string",
                          "format": "date",
                          "description": "Fecha de registro del huésped"
                        },
                        "guest_rank": {
                          "type": "string",
                          "description": "Rango del huésped"
                        },
                        "guest_details": {
                          "type": "string",
                          "description": "Detalles adicionales del huésped (opcional)"
                        },
                        "user": {
                          "type": "string",
                          "format": "uuid",
                          "description": "ID de referencia al usuario asociado"
                        }
                      }
                    },
                        User: {
                            type: "object",
                            required: ["name", "username", "password", "active"],
                            properties: {
                              name: {
                                type: "string",
                                description: "Nombre completo del usuario"
                              },
                              username: {
                                type: "string",
                                description: "Nombre de usuario"
                              },
                              password: {
                                type: "string",
                                description: "Contraseña del usuario"
                              },
                              active: {
                                type: "boolean",
                                description: "Estado de la cuenta (activa o no)"
                              }
                            }
                          },
                          GuestRank: {
                            type: "object",
                            required: ["guest_rank", "descuentos"],
                            properties: {
                              guest_rank: {
                                type: "string",
                                description: "Rango del huésped"
                              },
                              descuentos: {
                                type: "number",
                                description: "Porcentaje de descuento aplicable"
                              },
                              beneficios: {
                                type: "string",
                                description: "Beneficios adicionales (opcional)"
                              }
                            }
                          },
                          GuestEvent: {
                            type: "object",
                            required: [
                              "id_booking",
                              "id_event",
                              "event_datetime"
                            ],
                            properties: {
                              id_booking: {
                                type: "integer",
                                description: "ID de la reserva asociada"
                              },
                              id_event: {
                                type: "integer",
                                description: "ID único del evento"
                              },
                              event_datetime: {
                                type: "string",
                                format: "date-time",
                                description: "Fecha y hora del evento"
                              },
                              is_type_room_change: {
                                type: "boolean",
                                description: "Indica si se cambió el tipo de habitación"
                              },
                              is_qty_guest_change: {
                                type: "boolean",
                                description: "Indica si se cambió la cantidad de huéspedes"
                              },
                              is_qty_room_change: {
                                type: "boolean",
                                description: "Indica si se cambió la cantidad de habitaciones"
                              },
                              is_dates_change: {
                                type: "boolean",
                                description: "Indica si se cambiaron las fechas de la reserva"
                              },
                              new_type_room: {
                                type: "string",
                                description: "Nuevo tipo de habitación (si aplica)"
                              },
                              deleted_rooms: {
                                type: "array",
                                items: {
                                  type: "integer",
                                  description: "IDs de habitaciones eliminadas"
                                },
                                description: "Array con IDs de las habitaciones eliminadas"
                              },
                              adds_rooms: {
                                type: "array",
                                items: {
                                  type: "integer",
                                  description: "IDs de habitaciones añadidas"
                                },
                                description: "Array con IDs de las habitaciones añadidas"
                              },
                              new_arrival_date: {
                                type: "string",
                                format: "date",
                                description: "Nueva fecha de llegada (si aplica)"
                              },
                              new_departure_date: {
                                type: "string",
                                format: "date",
                                description: "Nueva fecha de salida (si aplica)"
                              },
                              new_guests_qty: {
                                type: "integer",
                                description: "Nueva cantidad de huéspedes (si aplica)"
                              },
                              new_nights_qty: {
                                type: "integer",
                                description: "Nueva cantidad de noches (si aplica)"
                              }
                            }
                          },
                          AuthSignup: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                                example: "John Doe",
                              },
                              username: {
                                type: "string",
                                example: "johndoe",
                              },
                              password: {
                                type: "string",
                                format: "password",
                                example: "123456",
                              },
                              active: {
                                type: "boolean",
                                example: true,
                              }
                            },
                            required: ["name", "username", "password"],
                          },
                          AuthSignin: {
                            type: "object",
                            properties: {
                              username: {
                                type: "string",
                                example: "johndoe",
                              },
                              password: {
                                type: "string",
                                format: "password",
                                example: "123456",
                              },
                            },
                            required: ["username", "password"],
                          },
                          TokenResponse: {
                            type: "object",
                            properties: {
                              token: {
                                type: "string",
                                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                              },
                            },
                          }

            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ["./routes/*.js"], // Esto documentará las rutas en la carpeta 'routes'
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
