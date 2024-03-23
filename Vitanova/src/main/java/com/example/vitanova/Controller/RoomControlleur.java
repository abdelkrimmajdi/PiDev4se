package com.example.vitanova.Controller;

import com.example.vitanova.Entities.Message;
import com.example.vitanova.Entities.Room;
import com.example.vitanova.Service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/Room")
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
}
