package com.codeacademy.api.entities;

import com.codeacademy.api.validation.ValidIndicationBulb;
import com.codeacademy.api.validation.ValidRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    private String id;
    @Column(name = "Status", nullable = false)
    @NotNull(message = "Status cannot be null")
    @NotBlank(message = "Status is mandatory")
    @ValidIndicationBulb(message = "Status must be either OPEN or ONGOING or FINISHED")
    private  String indicationBulb;
    @Column(columnDefinition = "LONGTEXT", length = 2000)
    private String description;
    private ZonedDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private MyUser user;

    public Order( String description ) {
        this.description = description;
    }

    public Order(String id, String description, ZonedDateTime createdAt) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
    }


    @PrePersist
    public void onPrePersist() {
        createdAt = ZonedDateTime.parse(ZonedDateTime.now().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));
    }

    public Order(String id, String description) {
        this.id = id;
        this.description = description;
    }
}
