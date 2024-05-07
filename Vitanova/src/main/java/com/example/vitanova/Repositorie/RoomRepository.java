package com.example.vitanova.Repositorie;

import com.example.vitanova.Entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.HashSet;

@Repository
public interface RoomRepository extends JpaRepository<Room,Long> {
    HashSet<Room> getChatByFirstFirstName(String firstname);

    HashSet<Room> getChatBySecondFirstName(String firstname);

    HashSet<Room> getChatByFirstFirstNameAndSecondFirstName(String firstFirstName, String secondFirstName);

    HashSet<Room> getChatBySecondFirstNameAndFirstFirstName(String firstFirstName, String secondFirstName);
}
