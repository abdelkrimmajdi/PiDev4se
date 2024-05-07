package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Message;
import com.example.vitanova.Entities.Room;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Service.RoomService;
import com.example.vitanova.exeception.ChatNotFoundException;
import com.example.vitanova.exeception.NoChatExistsInTheRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/Room")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RoomControlleur {

    @Autowired
    private RoomService roomService;

    @PostMapping("/createRoom")
    public Room createRoom(@RequestBody Room room) {
        return roomService.createRoom(room);
    }

    @GetMapping("/getRoomById/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id);
    }

    @GetMapping("/getAllRooms")
    public Set<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @DeleteMapping("/deleteRoom/{id}")
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }

    @PutMapping("/updateRoom/{id}")
    public Room updateRoom(@PathVariable Long id, @RequestBody Room room) {
        return roomService.updateRoom(id, room);
    }

    @PostMapping("/createMessage/create")
    public Message createMessage(@RequestBody Message message) {
        return roomService.createMessage(message);
    }

    @GetMapping("/getMessageById/{id}")
    public Message getMessageById(@PathVariable Long id) {
        return roomService.getMessageById(id);
    }

    @GetMapping("/getAllMessages/all")
    public Set<Message> getAllMessages() {
        return roomService.getAllMessages();
    }

    @DeleteMapping("/deleteMessage/{id}")
    public void deleteMessage(@PathVariable Long id) {
        roomService.deleteMessage(id);
    }

    @PutMapping("/updateMessage/{id}")
    public Message updateMessage(@PathVariable Long id, @RequestBody Message message) {
        return roomService.updateMessage(id, message);
    }
    @GetMapping("/getAllMessagesInChat/{idRoom}")
    public ResponseEntity<Set<Message>> getAllMessagesInChat(@PathVariable long idRoom) {
        try {
            Set<Message> messages = roomService.getAllMessagesInChat(idRoom);
            return ResponseEntity.ok(messages);
        } catch (NoChatExistsInTheRepository e) {
            return ResponseEntity.notFound().build();
        }
    }
    // Endpoint to retrieve messages by roomId
    @GetMapping("/getAllMessagesFromChat/{roomId}")
    public ResponseEntity<Set<Message>> getAllMessagesInChat(@PathVariable Long roomId) {
        try {
            Set<Message> messagesInRoom = roomService.getAllMessagesByRoomId(roomId);
            return new ResponseEntity<>(messagesInRoom, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Or handle specific exception scenarios
        }
    }
    @GetMapping("/getChatByFirstUserName/{firstname}")
    public ResponseEntity<HashSet<Room>> getChatByFirstUserName(@PathVariable String firstname) {
        try {
            HashSet<Room> rooms = roomService.getChatByFirstUserName(firstname);
            return ResponseEntity.ok(rooms);
        } catch (ChatNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/getChatBySecondUserName/{firstname}")
    public ResponseEntity<HashSet<Room>> getChatBySecondUserName(@PathVariable String firstname) {
        try {
            HashSet<Room> rooms = roomService.getChatBySecondUserName(firstname);
            return ResponseEntity.ok(rooms);
        } catch (ChatNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getChatByFirstUserNameOrSecondUserName/{firstname}")
    public ResponseEntity<HashSet<Room>> getChatByFirstUserNameOrSecondUserName(@PathVariable String firstname) {
        try {
            HashSet<Room> rooms = roomService.getChatByFirstUserNameOrSecondUserName(firstname);
            return ResponseEntity.ok(rooms);
        } catch (ChatNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getChatByFirstUserNameAndSecondUserName/{firstfirstname}/{secondfirstname}")
    public ResponseEntity<HashSet<Room>> getChatByFirstUserNameAndSecondUserName(@PathVariable String firstfirstname, @PathVariable String secondfirstname) {
        try {
            HashSet<Room> rooms = roomService.getChatByFirstUserNameAndSecondUserName(firstfirstname, secondfirstname);
            return ResponseEntity.ok(rooms);
        } catch (ChatNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Implement other endpoints similarly...

    @PostMapping("/addMessageToRoom/{idRoom}")
    public ResponseEntity<Room> addMessageToRoom(@RequestBody Message message, @PathVariable long idRoom) {
        try {
            Room updatedRoom = roomService.addMessage(message, idRoom);
            return ResponseEntity.ok(updatedRoom);
        } catch (ChatNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getbyfirstname/{firstname}")
    public ResponseEntity<User> getUserByFirstName(@PathVariable String firstname) throws IOException {

        return new ResponseEntity<User>(roomService.getUserByFirstName(firstname), HttpStatus.OK);

    }

}
