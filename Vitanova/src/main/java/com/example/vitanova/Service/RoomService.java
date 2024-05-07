package com.example.vitanova.Service;

import com.example.vitanova.Entities.Message;
import com.example.vitanova.Entities.Room;
import com.example.vitanova.Entities.User;
import com.example.vitanova.exeception.ChatNotFoundException;
import com.example.vitanova.exeception.NoChatExistsInTheRepository;

import java.util.HashSet;
import java.util.Set;

public interface RoomService {

    Room createRoom(Room room);

    Room getRoomById(Long roomId);

    Set<Room> getAllRooms();

    void deleteRoom(Long roomId);

    Room updateRoom(Long roomId, Room room);

    Message createMessage(Message message);

    Message getMessageById(Long messageId);

    Set<Message> getAllMessages();

    void deleteMessage(Long messageId);

    Message updateMessage(Long messageId, Message message);

    Set<Message> getAllMessagesInChat(long IdRoom) throws NoChatExistsInTheRepository;

    Set<Message> getAllMessagesByRoomId(Long roomId);

    HashSet<Room> getChatByFirstUserName(String firstname) throws ChatNotFoundException;

    HashSet<Room> getChatBySecondUserName(String firstname) throws ChatNotFoundException;

    HashSet<Room> getChatByFirstUserNameOrSecondUserName(String firstname) throws ChatNotFoundException;

    HashSet<Room> getChatByFirstUserNameAndSecondUserName(String firstfirstname, String secondfirstname) throws ChatNotFoundException;

    Room addMessage(Message add, long IdRoom) throws ChatNotFoundException;

    User getUserByFirstName(String firstname);
}
