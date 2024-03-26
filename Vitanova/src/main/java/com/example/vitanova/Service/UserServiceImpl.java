package com.example.vitanova.Service;

import com.example.vitanova.Entities.MentorProgram;
import com.example.vitanova.Entities.Role;
import com.example.vitanova.Entities.User;
import com.example.vitanova.Entities.VerificationToken;
import com.example.vitanova.Repositorie.UserRepository;
import com.example.vitanova.Repositorie.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    @Autowired
    private VerificationTokenRepository verificationTokenRepository;



    public UserDetailsService userDetailsService(){

        return  new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return userRepository.findByEmail(username)
                        .orElseThrow(()-> new UsernameNotFoundException(("User not found")));
            }
        };
    }


    public User updateUser(User user) {
        if (user.getId() != null) {
            User existingEtudiant = userRepository.findById(user.getId()).orElse(null);
            if (existingEtudiant != null) {
                if (user.getFirstName()!= null) {
                    existingEtudiant.setFirstName(user.getFirstName());
                }
                if (user.getLastName() != null) {
                    existingEtudiant.setLastName(user.getLastName());
                }

                if (user.getEmail() != null) {
                    existingEtudiant.setEmail(user.getEmail());
                }


                return userRepository.save(existingEtudiant);
            }
        }
        return null;
    }
    public User updatePassword (Long idUser, String password) {

        User user = userRepository.findById(idUser).orElse(null);
        user.setPassword(new BCryptPasswordEncoder().encode(password));
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }
    public void deleteUser(Long idUser) {
        Optional<User> userOptional = userRepository.findById(idUser);


            User user = userOptional.get();

            // Trouver les tokens de vérification liés à cet utilisateur
            List<VerificationToken> tokens = verificationTokenRepository.findByUser(user);

            // Supprimer chaque token de vérification trouvé
            for (VerificationToken token : tokens) {
                verificationTokenRepository.delete(token);
            }

            // Supprimer l'utilisateur lui-même
            userRepository.deleteById(idUser);

    }
    public User getUserById(Long idUser) {
        return userRepository.findById(idUser).orElse(null);
    }
    public User updateUserRole(Long userId, Role newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));
        user.setRole(newRole);
        return userRepository.save(user);
    }

}
