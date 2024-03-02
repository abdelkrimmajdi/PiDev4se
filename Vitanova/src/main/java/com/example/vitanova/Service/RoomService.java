package com.example.vitanova.Service;

import com.example.vitanova.Entities.Message;
import com.example.vitanova.Entities.Room;

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
}
