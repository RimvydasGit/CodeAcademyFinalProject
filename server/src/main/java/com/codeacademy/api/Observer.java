package com.codeacademy.api;

import com.codeacademy.api.entities.MyUser;
import com.codeacademy.api.entities.Order;
import com.codeacademy.api.repositories.OrderRepository;
import com.codeacademy.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


import java.util.List;
import java.util.UUID;


@Component
public class Observer implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderRepository orderRepository;

    @Override
    public void run(String... args) throws Exception {
        List<MyUser> users = userRepository.findAll();
        List<Order> orders = orderRepository.findAll();
        if(users.isEmpty()){
            MyUser user = new MyUser();
            user.setFullName("Peter Pete");
            user.setEmail("peter@gmail.com");
            user.setPassword("Peter123@");
            PasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode(user.getPassword()));
            user.setRole("ADMIN");
            userRepository.save(user);

            MyUser user2 = new MyUser();
            user2.setFullName("John Johnson");
            user2.setEmail("john@gmail.com");
            user2.setPassword("John123@");
            user2.setPassword(encoder.encode(user2.getPassword()));
            user2.setRole("USER");
            userRepository.save(user2);
        }
        if(orders.isEmpty()){
            MyUser user = userRepository.findByEmail("peter@gmail.com");
            MyUser user2 = userRepository.findByEmail("john@gmail.com");
            Order order1 = new Order();
            order1.setId(UUID.randomUUID().toString());
            order1.setIndicationBulb("OPEN");
            order1.setDescription("This is one of simple orders request");
            order1.getCreatedAt();
            order1.setUser(user);
            orderRepository.save(order1);
            order1.setId(UUID.randomUUID().toString());
            order1.setUser(user2);
            orderRepository.save(order1);

            Order order2 = new Order();
            order2.setId(UUID.randomUUID().toString());
            order2.setIndicationBulb("ONGOING");
            order2.setDescription("This is another one order seeded");
            order2.getCreatedAt();
            order2.setUser(user);
            orderRepository.save(order2);
            order2.setId(UUID.randomUUID().toString());
            order2.setUser(user2);
            orderRepository.save(order2);
        }
    }
}