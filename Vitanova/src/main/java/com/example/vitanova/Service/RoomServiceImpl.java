package com.example.vitanova.Service;

import com.example.vitanova.Entities.Message;
import com.example.vitanova.Entities.Room;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Repositorie.MessageRepository;
import com.example.vitanova.Repositorie.RoomRepository;
import com.example.vitanova.Repositorie.UserRepository;
import com.example.vitanova.exeception.ChatNotFoundException;
import com.example.vitanova.exeception.NoChatExistsInTheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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
    @Override
    public Set<Message> getAllMessagesInChat(long IdRoom) throws NoChatExistsInTheRepository {
        Room room = roomRepository.findById(IdRoom)
                .orElseThrow(() -> new RuntimeException("Journal not found for this id :: " + IdRoom));
        return room.getMessages();
    }
    @Override
    public Set<Message> getAllMessagesByRoomId(Long roomId) {
        // Retrieve all messages from the database
        Set<Message> allMessages = new HashSet<>(messageRepository.findAll());

        // Filter out messages belonging to the specified room
        Set<Message> messagesInRoom = allMessages.stream()
                .filter(message -> message.getChat() != null && message.getChat().getIdRoom().equals(roomId))
                .collect(Collectors.toSet());

        return messagesInRoom;
    }
    @Override
    public HashSet<Room> getChatByFirstUserName(String firstname) throws ChatNotFoundException {
        HashSet<Room> chat = roomRepository.getChatByFirstFirstName(firstname);

        if (chat.isEmpty()) {
            throw new ChatNotFoundException();
        } else {
            return chat;
        }
    }

    @Override
    public HashSet<Room> getChatBySecondUserName(String firstname) throws ChatNotFoundException {
        HashSet<Room> chat = roomRepository.getChatBySecondFirstName(firstname);
        if (chat.isEmpty()) {
            throw new ChatNotFoundException();
        } else {
            return chat;
        }
    }

    @Override
    public HashSet<Room> getChatByFirstUserNameOrSecondUserName(String firstname) throws ChatNotFoundException {
        HashSet<Room> chat = roomRepository.getChatByFirstFirstName(firstname);
        HashSet<Room> chat1 = roomRepository.getChatBySecondFirstName(firstname);

        chat1.addAll(chat);

        if (chat.isEmpty() && chat1.isEmpty()) {
            throw new ChatNotFoundException();
        } else if (chat1.isEmpty()) {
            return chat;
        } else {
            return chat1;
        }
    }

    @Override
    public HashSet<Room> getChatByFirstUserNameAndSecondUserName(String firstfirstname, String secondfirstname) throws ChatNotFoundException {
        HashSet<Room> chat = roomRepository.getChatByFirstFirstNameAndSecondFirstName(firstfirstname, secondfirstname);
        HashSet<Room> chat1 = roomRepository.getChatBySecondFirstNameAndFirstFirstName(firstfirstname, secondfirstname);
        if (chat.isEmpty() && chat1.isEmpty()) {
            throw new ChatNotFoundException();
        } else if (chat.isEmpty()) {
            return chat1;
        } else {
            return chat;
        }
    }
    @Override
    public Room addMessage(Message add, long IdRoom) throws ChatNotFoundException {
        Optional<Room> chat=roomRepository.findById(IdRoom);
        Room abc=chat.get();

        if(abc.getMessages()==null){
            Set<Message> msg=new HashSet<>();
            msg.add(add);
            abc.setMessages(msg);
            return roomRepository.save(abc);
        }else{
            Set<Message> rates=abc.getMessages();
            rates.add(add);
            abc.setMessages(rates);
            return roomRepository.save(abc);
        }
    }
    @Override
    public User getUserByFirstName(String firstname)  {
        Optional<User> user1=userRepository.findByFirstName(firstname);
        return user1.get();

    }
}
