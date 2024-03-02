package com.example.vitanova.Service;

import com.example.vitanova.Entities.Message;
import com.example.vitanova.Entities.Room;
import com.example.vitanova.Repositorie.MessageRepository;
import com.example.vitanova.Repositorie.RoomRepository;
import com.example.vitanova.Repositorie.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
@Service
public class RoomServiceImpl implements RoomService{
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }
    @Override
    public Room getRoomById(Long roomId) {
        Optional<Room> roomOptional = roomRepository.findById(roomId);
        return roomOptional.orElse(null);
    }
    @Override
    public Set<Room> getAllRooms() {
        return new HashSet<>(roomRepository.findAll());
    }

    @Override
    public void deleteRoom(Long roomId) {
        roomRepository.deleteById(roomId);
    }

    @Override
    public Room updateRoom(Long roomId, Room room) {
        if (roomRepository.existsById(roomId)) {
            room.setIdRoom(roomId);
            return roomRepository.save(room);
        }
        return null;
    }

    @Override
    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }
    @Override
    public Message getMessageById(Long messageId) {
        Optional<Message> messageOptional = messageRepository.findById(messageId);
        return messageOptional.orElse(null);
    }
    @Override
    public Set<Message> getAllMessages() {
        return new HashSet<>(messageRepository.findAll());
    }

    @Override
    public void deleteMessage(Long messageId) {
        messageRepository.deleteById(messageId);
    }

    @Override
    public Message updateMessage(Long messageId, Message message) {
        if (messageRepository.existsById(messageId)) {
            message.setIdMess(messageId);
            return messageRepository.save(message);
        }
        return null;
    }
}
